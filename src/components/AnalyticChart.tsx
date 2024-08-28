import {useEffect, useRef, useState} from "react";
import {Chart, Colors} from "chart.js/auto";

Chart.register(Colors);

interface PieChartProps {
    departmentCosts: Record<string, string>
}

export function PieChart(
    props: PieChartProps
) {
    const chart = useRef<Chart<any, any[], any> | null>(null);
    const canvas = useRef<any | null>(null);

    const createChart = (canvas: any) => {
        const data = {
            labels: [],
            datasets: [{
                label: 'Department Costs',
                data: [],
                hoverOffset: 4
            }]
        };
        return new Chart(
            canvas,
            {
                type: 'pie',
                data: data,
                options: {
                    plugins: {
                        colors: {
                            // automatic coloring of the slices
                            forceOverride: true
                        }
                    }
                }
            }
        );
    };

    useEffect(() => {
        chart.current = createChart(canvas.current);
        return () => {
            if (chart.current != null) {
                chart.current.destroy();
            }
        };
    }, []);

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