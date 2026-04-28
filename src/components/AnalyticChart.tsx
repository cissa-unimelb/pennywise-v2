import {useEffect, useRef} from "react";
import {Chart, PieController, ArcElement, Legend, Title, Tooltip} from "chart.js";

Chart.register(PieController);
Chart.register(ArcElement);
Chart.register(Legend);
Chart.register(Title);
Chart.register(Tooltip);
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
        backgroundColor: [
          "#22d3ee",
          "#06b6d4",
          "#0891b2",
          "#0ea5e9",
          "#38bdf8",
          "#67e8f9",
          "#155e75",
          "#164e63",
          "#083344",
        ],
        borderColor: "#020617",
        borderWidth: 2,
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
              position: 'bottom',
              labels: {
                color: "#dffcff",
              }
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

  return <div style={{minHeight: 360}}>
    <canvas ref={canvas}></canvas>
  </div>;
}
