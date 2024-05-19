import React from 'react';
import Plot from 'react-plotly.js';
import './Dashboard.css'; // Import the CSS file
const Dashboard = () => {
  // Datos hardcoded
  const data = [
    { usuario_nombre: "Estudiante 1", nivel_nombre: "Nivel 1", total_puntuacion: 50, total_tiempo: 120 },
    { usuario_nombre: "Estudiante 1", nivel_nombre: "Nivel 2", total_puntuacion: 75, total_tiempo: 150 },
    { usuario_nombre: "Estudiante 2", nivel_nombre: "Nivel 1", total_puntuacion: 60, total_tiempo: 130 },
    { usuario_nombre: "Estudiante 2", nivel_nombre: "Nivel 2", total_puntuacion: 85, total_tiempo: 160 },
    { usuario_nombre: "Estudiante 3", nivel_nombre: "Nivel 1", total_puntuacion: 55, total_tiempo: 125 },
    { usuario_nombre: "Estudiante 3", nivel_nombre: "Nivel 3", total_puntuacion: 90, total_tiempo: 180 },
  ];

  const transformDataForPoints = (data) => {
    const transformedData = data.reduce((acc, curr) => {
      const { usuario_nombre, nivel_nombre, total_puntuacion } = curr;
      if (!acc[usuario_nombre]) acc[usuario_nombre] = { name: usuario_nombre, x: [], y: [] };
      acc[usuario_nombre].x.push(nivel_nombre);
      acc[usuario_nombre].y.push(total_puntuacion);
      return acc;
    }, {});
    return Object.values(transformedData);
  };

  const transformDataForTime = (data) => {
    const transformedData = data.reduce((acc, curr) => {
      const { usuario_nombre, nivel_nombre, total_tiempo } = curr;
      if (!acc[usuario_nombre]) acc[usuario_nombre] = { name: usuario_nombre, x: [], y: [] };
      acc[usuario_nombre].x.push(nivel_nombre);
      acc[usuario_nombre].y.push(total_tiempo);
      return acc;
    }, {});
    return Object.values(transformedData);
  };

  const transformDataForPie = (data) => {
    const transformedData = data.reduce((acc, curr) => {
      const { nivel_nombre, total_puntuacion } = curr;
      if (!acc[nivel_nombre]) acc[nivel_nombre] = { label: nivel_nombre, value: 0 };
      acc[nivel_nombre].value += total_puntuacion;
      return acc;
    }, {});
    return Object.values(transformedData);
  };

  return (
    <div className="dashboard-container">
      <div className="plot-container">
        <h2>Puntos Totales Obtenidos por Cada Estudiante por Nivel</h2>
        <Plot
          className="plotly-chart"
          data={transformDataForPoints(data).map(student => ({
            ...student,
            type: 'bar'
          }))}
          layout={{
            title: 'Puntos Totales Obtenidos por Cada Estudiante por Nivel',
            xaxis: { title: 'Nivel' },
            yaxis: { title: 'Puntos Totales' }
          }}
        />
      </div>

      <div className="plot-container">
        <h2>Tiempo Total Dedicado por Cada Estudiante por Nivel</h2>
        <Plot
          className="plotly-chart"
          data={transformDataForTime(data).map(student => ({
            ...student,
            type: 'scatter',
            mode: 'lines+markers'
          }))}
          layout={{
            title: 'Tiempo Total Dedicado por Cada Estudiante por Nivel',
            xaxis: { title: 'Nivel' },
            yaxis: { title: 'Tiempo Total (segundos)' }
          }}
        />
      </div>

      <div className="plot-container">
        <h2>Distribución de Puntos Totales en Todos los Niveles</h2>
        <Plot
          className="plotly-chart"
          data={[{
            type: 'pie',
            labels: transformDataForPie(data).map(level => level.label),
            values: transformDataForPie(data).map(level => level.value)
          }]}
          layout={{
            title: 'Distribución de Puntos Totales en Todos los Niveles'
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
