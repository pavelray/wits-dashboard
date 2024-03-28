"use client";
import { Fragment, useEffect } from "react";
import { Chart } from "chart.js/auto";
import Title from "@/components/UI/Heading/Title";
import "chartjs-adapter-date-fns";
import { enUS } from "date-fns/locale";

function LineChart({ labels, datasets, name = "Line Chart", id = "myChart" }) {
  useEffect(() => {
    const ctx = document.getElementById(id).getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
              tooltipFormat: "dd MMM yyyy HH:mm:ss",
              displayFormats: {
                day: "dd MMM yyyy",
              },
            },
            // ticks: {
            //   beginAtZero: false,
            //   autoSkip: false,
            // },
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            title: {
              display: true,
              text: "value",
            },
            min: 0,
            ticks: {
              stepSize: 1,
            },
          },
        },
        adapters: {
          date: {
            locale: enUS,
          },
        },
      },
    });
    return () => {
      myChart.destroy();
    };
  }, [datasets, id, labels]);

  return (
    <Fragment>
      <Title text={name} />
      <div className="w-full h-full flex mx-auto my-auto">
        <div className="border border-gray-400 pt-0 w-full h-fit my-auto">
          <canvas id={id}></canvas>
        </div>
      </div>
    </Fragment>
  );
}

export default LineChart;
