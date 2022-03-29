/*
                  ┌─────────────────────────┐
                  │ ◯                   ◯ │
                  │       ┌──────────┐      │
     MQ135 A0 <== │[]  A0 │ ESP 8266 │ D0 []│ (GPIO16)
                  │[]   G │    AZ    │ D1 []│ (GPIO5)
                  │[]  VV │ Delivery │ D2 []│ (GPIO4)
         (GPIO10) │[]  S3 │ Ver  0.1 │ D3 []│ (GPIO0)
          (GPIO9) │[]  S2 └──────────┘ D4 []│ (GPIO2)
                  │[]  S1 ┌┐┌┐  ┌─┐    3V []│
                  │[]  SC └┘└┘  │ │    G  []│
                  │[]  SO ┌─┐   └─┘    D5 []│ (GPIO14) ==> PMS's TX
                  │[]  SK └─┘          D6 []│ (GPIO12) ==> PMS's RX
                  │[]   G              D7 []│ (GPIO13) ==> MHZ19's TX
                  │[]  3V ┌┐  ┌┐       D8 []│ (GPIO15) ==> MHZ19's RX
                  │[]  EN └┘  └┘       RX []│
                  │[] RST ┌───────┐    TX []│
                  │[]   G └───────┘    G  []│
                  │[] Vin              3V []│
                  │                         │
                  │ ◯    []       []    ◯ │
                  └──────────│USB│──────────┘
*/
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include "DHT.h"

#include "MHZ19.h"
#include "PMS.h"

#define BAUDRATE 9600
#define DHTPIN 2
#define DHTTYPE DHT11

const char *SSID = "Livebox-4FC0";
const char *PASSWORD = "pas le vrais mot de pass ";
const char *API_URL = "http://192.168.1.36:3005/";
const char *COLLECTOR_KEY = "67addd4a-a827"; //TODO COLLECTOR id

unsigned long get_data_timer = 0;

MHZ19 myMHZ19;
SoftwareSerial myMHZ19Serial(13, 15);

SoftwareSerial pmsSerial(14, 12);
PMS pms(pmsSerial);
PMS::DATA data;

DHT dht(DHTPIN, DHTTYPE);

void setup()
{
  // TODO si co2 == 0 reset pendant 7 sec
  Serial.begin(BAUDRATE);

  WiFi.begin(SSID, PASSWORD);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  WiFi.setAutoReconnect(true);
  WiFi.persistent(true);

  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  myMHZ19Serial.begin(BAUDRATE);
  myMHZ19.begin(myMHZ19Serial);
  myMHZ19.autoCalibration();

  pmsSerial.begin(BAUDRATE);
  pms.wakeUp();

  pinMode(A0, INPUT);

  dht.begin();
}

void send_to_API(int co2, int air_quality, float humidity, float temperature, uint16_t pm1_0, uint16_t pm2_5, uint16_t pm10_0)
{
  if (WiFi.status() == WL_CONNECTED)
  {
    char json[256];
    WiFiClient client;
    HTTPClient http;
    http.begin(client, API_URL);
    http.addHeader("Content-Type", "application/json");
    snprintf(json, sizeof(json), "{ \"collectorId\": \"%s\", \"co2\": \"%d\", \"air_quality\": \"%d\", \"humidity\": \"%f\", \"temperature\": \"%f\",  \"pm1_0\": \"%d\", \"pm2_5\": \"%d\", \"pm10_0\": %d }", COLLECTOR_KEY, co2, air_quality, humidity, temperature, pm1_0, pm2_5, pm10_0);
    Serial.println(json);
    int httpResponseCode = http.POST(json);
    Serial.println(httpResponseCode);
    http.end();
  }
}

void loop()
{
  delay(2000);
  Serial.println("toto");

  if (millis() - get_data_timer >= 5000)
  {
    int co2 = 0;
    int air_quality = analogRead(A0);
    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature();
    uint16_t pm1_0 = 0;
    uint16_t pm2_5 = 0;
    uint16_t pm10_0 = 0;

    co2 = myMHZ19.getCO2();

    pms.requestRead();

    if (pms.readUntil(data))
    {
      pm1_0 = data.PM_AE_UG_1_0;

      pm2_5 = data.PM_AE_UG_2_5;

      pm10_0 = data.PM_AE_UG_10_0;
    }

    get_data_timer = millis();
    send_to_API(co2, air_quality, humidity, temperature, pm1_0, pm2_5, pm10_0);
  }
}
