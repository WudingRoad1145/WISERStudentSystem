module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
      name: {
        type: Sequelize.STRING
      },
      form: {
        type: Sequelize.STRING
      },
      graduationYear:{
        type: Sequelize.STRING
      },
      graduated: {
        type: Sequelize.BOOLEAN
      }
    });
    return Student;
  };