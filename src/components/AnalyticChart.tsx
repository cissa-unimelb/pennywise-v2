import {useEffect, useRef, useState} from "react";
import {Chart, Colors, BarElement, BarController, PieController, ArcElement, LinearScale, CategoryScale, Legend, Title, Tooltip} from "chart.js";
import {GetInvoicesByTime, InvoiceSchema} from "../database/invoice";
import {Finance} from "../database/analytics";

Chart.register(PieController);
Chart.register(ArcElement);
Chart.register(Legend);
Chart.register(Title);
Chart.register(Tooltip);
Chart.register(Colors);

Chart.register(BarController);
Chart.register(BarElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);

interface PieChartProps {
  departmentCosts: Record<string, string>
}

export function PieChart(
  props: PieChartProps
) {
  const chart = useRef<Chart<any, any[], any> | null>(null);
  const canvas = useRef<any | null>(null);

  // Create a chart instance with options
  const createChart = (canvas: any) => {
    const data = {
      labels: [],
      datasets: [{
        label: 'Costs',
        data: [],
      }]
    };
    return new Chart(
      canvas,
      {
        type: 'pie',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {},
            title: {
              display: true,
              text: 'Department Costs',
              font: {
                size: 24,
              }
            },
            legend: {
              position: 'right'
            },
            colors: {
              // automatic coloring of the slices
              forceOverride: true
            }
          }
        }
      }
    );
  };

  // Loading chart on mount
  useEffect(() => {
    chart.current = createChart(canvas.current);
    return () => {
      if (chart.current != null) {
        chart.current.destroy();
      }
    };
  }, []);

  // Updating chart on department cost update
  useEffect(() => {
    if (chart.current == null) {
      return;
    }

    chart.current.data.labels = Object.keys(props.departmentCosts);
    chart.current.data.datasets[0].data = Object.values(props.departmentCosts);
    chart.current.update();
  }, [props.departmentCosts]);

  return <div>
    <canvas ref={canvas}></canvas>
  </div>;
}


export function BarChart() {
  const chart = useRef<Chart<any, any[], any> | null>(null);
  const canvas = useRef<any | null>(null);
  const [invoices, setInvoices] = useState<InvoiceSchema[]>([]);

  // Create a chart instance with options
  const createChart = (canvas: any) => {
    const data = {
      labels: [],
      datasets: [{
        label: 'Cashflow',
        data: [],
      }]
    };
    return new Chart(
      canvas,
      {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {},
            title: {
              display: true,
              text: 'Monthly Cashflows',
              font: {
                size: 24,
              }
            },
            colors: {
              // automatic coloring of the slices
              forceOverride: true
            }
          }
        }
      }
    );
  };

  // Loading chart on mount
  useEffect(() => {
    chart.current = createChart(canvas.current);
    return () => {
      if (chart.current != null) {
        chart.current.destroy();
      }
    };
  }, []);

  // Updating chart on department cost update
  useEffect(() => {
    (async () => {
      // fetch invoices
      const date = new Date();
      date.setFullYear(date.getFullYear() - 1);
      const result = await GetInvoicesByTime(date);
      setInvoices(result);
    })();
  }, []);

  useEffect(() => {
    if (chart.current == null) {
      return;
    }
    let cashflow: Record<string, string> = {};
    for (const invoice of invoices) {
      let total = "0.00";
      for (const {amount} of invoice.items) {
        total = Finance.addPrice(total, amount);
      }

      const month = invoice.timestamp.toLocaleString('default', {month: 'long'});
      if (!Object.hasOwn(cashflow, month)) {
        cashflow[month] = total;
      } else {
        cashflow[month] = Finance.addPrice(cashflow[month], total);
      }
    }

    chart.current.data.labels = Object.keys(cashflow);
    chart.current.data.datasets[0].data = Object.values(cashflow);
    chart.current.update();
  }, [invoices]);

  return <div style={{minHeight: 400, marginTop: "5rem"}}>
    <canvas ref={canvas}></canvas>
  </div>;
}