const db = require('../models');
const Emi = db.emi;

function calculateEMI(loanAmount, interestRate, tenureMonths) {
  const monthlyRate = interestRate / 12 / 100;
  return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
         (Math.pow(1 + monthlyRate, tenureMonths) - 1);
}

exports.calculateEMI = async (req, res) => {
  const { loanAmount, interestRate, loanTenureMonths, prepaymentAmount = 0 } = req.body;
  const emi = calculateEMI(loanAmount, interestRate, loanTenureMonths);
  
  let remainingBalance = loanAmount;
  const monthWisePayments = [];
  
  for (let month = 1; month <= loanTenureMonths; month++) {
    const interestPaid = (remainingBalance * (interestRate / 12 / 100));
    const principalPaid = emi - interestPaid;
    remainingBalance -= principalPaid + prepaymentAmount;
    
    monthWisePayments.push({
      month,
      emiPaid: emi,
      interestPaid,
      principalPaid,
      prepayment: prepaymentAmount,
      remainingBalance: Math.max(remainingBalance, 0)
    });
    
    if (remainingBalance <= 0) break;
  }
  
  const emiRecord = await Emi.create({
    loan_amount: loanAmount,
    interest_rate: interestRate,
    loan_tenure_months: loanTenureMonths,
    emi,
    prepayment_amount: prepaymentAmount,
    remaining_balance: remainingBalance
  });

  res.json({
    loanAmount,
    interestRate,
    loanTenureMonths,
    emi,
    prepayment: prepaymentAmount,
    monthWisePayments
  });
};

exports.getAllEmis = async (req, res) => {
  const emis = await Emi.findAll();
  res.json(emis);
};

exports.getEmiById = async (req, res) => {
  const emi = await Emi.findByPk(req.params.id);
  if (emi) {
    res.json(emi);
  } else {
    res.status(404).send('EMI not found');
  }
};
