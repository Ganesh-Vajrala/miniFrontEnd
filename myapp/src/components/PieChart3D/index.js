import React, { useState, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

// Initialize the 3D module for Highcharts
Highcharts3D(Highcharts);

const PieChart3D = () => {
  const [selectedSlice, setSelectedSlice] = useState(null); // Track the selected slice
  const [totalValue, setTotalValue] = useState(0); // Track total value
  const [showAllData, setShowAllData] = useState(true); // Whether to show all data or only selected slice
  const chartRef = useRef(null); // Ref to track the chart instance
  const timeoutRef = useRef(null); // To track the inactivity timer

  // Initial data for the chart
  const chartData = [
    { name: 'occupied', y: 10, color: '#B7B7B7' },
    { name: 'vacant', y: 20, color: '#000000' },
    
  ];

  // Function to reset all slices and show all data
  const resetSlices = (chart) => {
    chart.series[0].data.forEach((point) => {
      point.slice(false); // Move all slices back to their original position
    });
    setSelectedSlice(null); // Clear selected slice details
    setShowAllData(true); // Show all data again
  };

  // Function to reset the inactivity timer
  const resetInactivityTimer = (chart) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      resetSlices(chart);
    }, 2000); // 10 seconds inactivity timer
  };

  const options = {
    chart: {
      type: 'pie',
      backgroundColor: '#ffffff',
      width: 420, // Set desired width
      height: 420, // Set desired height
      options3d: {
        alpha: 45,
        beta: 0,
      },
      events: {
        load: function () {
          const chart = this;
          chartRef.current = chart; // Store chart instance
          // Start the inactivity timer when the chart is loaded
          resetInactivityTimer(chart);

          // Calculate the initial total value
          const total = chartData.reduce((acc, slice) => acc + slice.y, 0);
          setTotalValue(total);
        },
      },
    },
    title: {
      text: null
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 0,
        dataLabels: {
          enabled: false, // Disable data labels on the pie chart
        },
        showInLegend: true, // Show the legend
        point: {
          events: {
            click: function () {
              const chart = this.series.chart;

              // Reset all slices before selecting the clicked one
              resetSlices(chart);

              // Separate the clicked slice
              this.slice(true);

              // Save the selected slice's data
              setSelectedSlice(this);
              setShowAllData(false); // Only show the selected slice's data

              // Reset the inactivity timer after the click event
              resetInactivityTimer(chart);
            },
          },
        },
      },
    },
    series: [
      {
        name: 'Values',
        colorByPoint: true,
        data: chartData,
      },
    ],
    legend: {
      enabled: true,
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
      itemMarginBottom: 10,
      itemStyle: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: '14px',
      },
    },
  };

  useEffect(() => {
    // Clean up the inactivity timer when the component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }} className='pie-chart-background-container'>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      <div style={{ width: '50%', padding: '20px' }}>
        {/* Conditionally show all slices data or the selected slice */}
        {showAllData ? (
          <div>
            <h3>All Slices Data</h3>
            {chartData.map((slice, index) => (
              <p key={index}>
                <strong>{slice.name}:</strong> {slice.y}
              </p>
            ))}
            <p>
              <strong>Total:</strong> {totalValue}
            </p>
          </div>
        ) : (
          selectedSlice && (
            <div>
              <h3>Selected Slice Details</h3>
              <p>
                <strong>Label:</strong> {selectedSlice.name}
              </p>
              <p>
                <strong>Value:</strong> {selectedSlice.y}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PieChart3D;
