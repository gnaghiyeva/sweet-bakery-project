import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { getAllCategories } from '../../../api/requests';
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarController, BarElement);

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cake Categories',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };


  const Counts = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories().then((res) => {
            setCategories(res.data);
        });
    }, []);

    console.log("Categories fetched:", categories);

    const getCategories = (categories) => {
        const categoryCounts = {};
        categories.forEach((category) => {
            if (categoryCounts[category.name]) {
                categoryCounts[category.name]++;
            } else {
                categoryCounts[category.name] = category.count;
            }
        });
        return categoryCounts;
    };

    const processedCategoryCounts = getCategories(categories);
    console.log("Processed category counts:", processedCategoryCounts);

    const chartData = {
        labels: Object.keys(processedCategoryCounts),
        datasets: [
            {
                label: 'Categories',
                data: Object.values(processedCategoryCounts),
                backgroundColor: 'rgb(183,224,158)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <Chart type="bar" options={options} data={chartData} />
        </div>
    )
}

export default Counts