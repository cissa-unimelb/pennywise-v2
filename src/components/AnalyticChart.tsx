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
          "#f97316",
          "#a855f7",
          "#84cc16",
          "#f43f5e",
          "#facc15",
          "#14b8a6",
          "#60a5fa",
          "#fb7185",
        ],
        borderColor: "#020617",
        borderWidth: 3,
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
            tooltip: {
              backgroundColor: "rgba(8, 15, 29, 0.95)",
              titleColor: "#ecfeff",
              bodyColor: "#dffcff",
              borderColor: "rgba(103, 232, 249, 0.18)",
              borderWidth: 1,
            },
            title: {
              display: true,
              text: 'Department Costs',
              color: "#ecfeff",
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
