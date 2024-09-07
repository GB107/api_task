module.exports = (sequelize, Sequelize) => {
    const Emi = sequelize.define('emi', {
      loan_amount: {
        type: Sequelize.DECIMAL
      },
      interest_rate: {
        type: Sequelize.DECIMAL
      },
      loan_tenure_months: {
        type: Sequelize.INTEGER
      },
      emi: {
        type: Sequelize.DECIMAL
      },
      prepayment_amount: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      remaining_balance: {
        type: Sequelize.DECIMAL
      }
    });
    return Emi;
  };
  