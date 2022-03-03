module.exports = (sequelize, Sequelize) => {
    const Dashboard = sequelize.define("dashboard", {
        name: {
            type: Sequelize.STRING
        }
    });
    return Dashboard;
};