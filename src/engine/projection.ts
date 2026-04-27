export type ProjectionInputs = {
  currentAge: number;
  retirementAge: number;
  currentSuperBalance: number;
  annualSalary: number;
  employerContributionRate: number; // e.g. 0.11
  voluntaryContribution: number;    // annual $
  expectedReturnRate: number;       // e.g. 0.07
  inflationRate: number;            // e.g. 0.025
  feeRate: number;                  // e.g. 0.0065
  salaryGrowthRate: number;         // e.g. 0.02
};

export type ProjectionRow = {
  year: number;
  age: number;
  salary: number;
  contributions: number;
  fees: number;
  balance: number;
  balanceInflationAdjusted: number;
};

export type ProjectionResult = {
  rows: ProjectionRow[];
  finalBalance: number;
  finalBalanceInflationAdjusted: number;
  estimatedAnnualIncome: number; // 4% rule
  yearsToRetirement: number;
};

export function runProjection(inputs: ProjectionInputs): ProjectionResult {
  const {
    currentAge,
    retirementAge,
    currentSuperBalance,
    annualSalary,
    employerContributionRate,
    voluntaryContribution,
    expectedReturnRate,
    inflationRate,
    feeRate,
    salaryGrowthRate,
  } = inputs;

  const years = retirementAge - currentAge;
  const rows: ProjectionRow[] = [];

  let balance = currentSuperBalance;
  let salary = annualSalary;

  for (let i = 1; i <= years; i++) {
    const age = currentAge + i;
    const employerContrib = salary * employerContributionRate;
    const totalContributions = employerContrib + voluntaryContribution;
    const growth = balance * expectedReturnRate;
    const fees = (balance + growth) * feeRate;
    balance = balance + growth + totalContributions - fees;
    salary = salary * (1 + salaryGrowthRate);

    const balanceInflationAdjusted = balance / Math.pow(1 + inflationRate, i);

    rows.push({
      year: new Date().getFullYear() + i,
      age,
      salary,
      contributions: totalContributions,
      fees,
      balance,
      balanceInflationAdjusted,
    });
  }

  const finalBalance = balance;
  const finalBalanceInflationAdjusted = rows[rows.length - 1]?.balanceInflationAdjusted ?? 0;

  return {
    rows,
    finalBalance,
    finalBalanceInflationAdjusted,
    estimatedAnnualIncome: finalBalance * 0.04,
    yearsToRetirement: years,
  };
}