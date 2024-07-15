import {DEPARTMENTS, getActiveReimbursement} from "./reimbursement";

export interface DepartmentStatistics {
  quantity: number;
  totalPrice: string;
  highestPrice: string;
}

namespace Finance {
  export function priceToNumber(price: string): number {
    if (!price.includes('.')) {
      return parseInt(price, 10) * 100;
    }

    const [left, right] = price.split('.');
    return parseInt(left, 10) * 100 + parseInt(right, 10);
  }

  export function numberToPrice(num: number): string {
    return (num / 100).toString().padStart(1, '0') + '.' + (num % 100).toString().padStart(2, '0');
  }

  export function addPrice(price1: string, price2: string): string {
    return numberToPrice(priceToNumber(price1) + priceToNumber(price2));
  }

  export function maxPrice(price1: string, price2: string): string {
    const p1 = priceToNumber(price1);
    const p2 = priceToNumber(price2);

    return (p1 > p2) ? numberToPrice(p1) : numberToPrice(p2);
  }
}

/**
 * Gets the department statistics for all active reimbursements
 */
export async function activeReimbursementDepartmentStatistics(): Promise<Record<string, DepartmentStatistics>> {
  const reimbursements = await getActiveReimbursement();

  let result: Record<string, DepartmentStatistics> = {}
  for (const department of DEPARTMENTS) {
    const departmentReimbursements = reimbursements
      .filter(reim => reim.department === department);

    // aggregate
    const totalPrice = departmentReimbursements
      .reduce((acc, reim) => Finance.addPrice(acc, reim.amount), '0.00');

    const highestPrice = departmentReimbursements
      .reduce((acc, reim) => Finance.maxPrice(acc, reim.amount), '0.00');

    const quantity = departmentReimbursements.length;

    result[department] = {
      quantity,
      totalPrice,
      highestPrice
    };
  }

  return result;
}