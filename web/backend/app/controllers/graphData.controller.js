const db = require("../models");
const Op = db.Sequelize.Op;

exports.getData = (req, res) => {
    res.status(200).send({
        "columns": [
            "timestamp",
            "value"
        ],
        "data": [
            [
                1646002338,
                19
            ],
            [
                1646003338,
                13
            ],
            [
                1646004338,
                20
            ],
            [
                1646005338,
                4
            ],
            [
                1646006338,
                12
            ],
            [
                1646007338,
                17
            ],
            [
                1646008338,
                20
            ],
            [
                1646009338,
                9
            ],
            [
                1646010338,
                20
            ],
            [
                1646011338,
                8
            ],
            [
                1646012338,
                19
            ],
            [
                1646013338,
                8
            ],
            [
                1646014338,
                1
            ],
            [
                1646015338,
                1
            ],
            [
                1646016338,
                4
            ],
            [
                1646017338,
                8
            ],
            [
                1646018338,
                18
            ],
            [
                1646019338,
                5
            ],
            [
                1646020338,
                19
            ],
            [
                1646021338,
                13
            ],
            [
                1646022338,
                5
            ],
            [
                1646023338,
                6
            ],
            [
                1646024338,
                20
            ],
            [
                1646025338,
                0
            ],
            [
                1646026338,
                4
            ],
            [
                1646027338,
                15
            ],
            [
                1646028338,
                4
            ],
            [
                1646029338,
                12
            ],
            [
                1646030338,
                4
            ],
            [
                1646031338,
                3
            ],
            [
                1646032338,
                2
            ],
            [
                1646033338,
                16
            ],
            [
                1646034338,
                0
            ],
            [
                1646035338,
                10
            ],
            [
                1646036338,
                3
            ],
            [
                1646037338,
                10
            ],
            [
                1646038338,
                13
            ],
            [
                1646039338,
                19
            ],
            [
                1646040338,
                3
            ],
            [
                1646041338,
                2
            ],
            [
                1646042338,
                4
            ],
            [
                1646043338,
                2
            ],
            [
                1646044338,
                18
            ],
            [
                1646045338,
                5
            ],
            [
                1646046338,
                1
            ],
            [
                1646047338,
                0
            ],
            [
                1646048338,
                0
            ],
            [
                1646049338,
                8
            ],
            [
                1646050338,
                3
            ],
            [
                1646051338,
                10
            ],
            [
                1646052338,
                1
            ],
            [
                1646053338,
                18
            ],
            [
                1646054338,
                14
            ],
            [
                1646055338,
                14
            ],
            [
                1646056338,
                4
            ],
            [
                1646057338,
                6
            ],
            [
                1646058338,
                20
            ],
            [
                1646059338,
                18
            ],
            [
                1646060338,
                20
            ]
        ]
    });
    return;
};