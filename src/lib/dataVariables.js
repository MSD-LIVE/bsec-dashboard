const AVAILABLE_VARIABLES = [
    {
        variable: 'dewptAvg',
        display: 'Dew Point - Average',
        units: '°C',
    },
    {
        variable: 'dewptHigh',
        display: 'Dew Point - High',
        units: '°C',
    },
    {
        variable: 'dewptLow',
        display: 'Dew Point - Low',
        units: '°C',
    },
    {
        variable: 'heatindexAvg',
        display: 'Heat Index - Average',
        units: '°C',
    },
    {
        variable: 'heatindexHigh',
        display: 'Heat Index - High',
        units: '',
    },
    {
        variable: 'heatindexLow',
        display: 'Heat Index - Low',
        units: '°C',
    },
    {
        variable: 'humidityAvg',
        display: 'Humidity - Average',
        units: '%',
    },
    {
        variable: 'humidityHigh',
        display: 'Humidity - High',
        units: '%',
    },
    {
        variable: 'humidityLow',
        display: 'Humidity - Low',
        units: '%',
    },
    {
        variable: 'precipRate',
        display: 'Precipitation - Rate',
        units: 'mm/hr',
    },
    {
        variable: 'precipTotal',
        display: 'Precipitation - Total',
        units: 'mm',
    },
    {
        variable: 'pressureMax',
        display: 'Pressure - Maximum',
        units: 'hPa',
    },
    {
        variable: 'pressureMin',
        display: 'Pressure - Minimum',
        units: 'hPa',
    },
    {
        variable: 'pressureTrend',
        display: 'Pressure - Trend',
        units: 'hPa',
    },
    {
        variable: 'qcStatus',
        display: 'Quality Control Status',
        units: '',
    },
    {
        variable: 'solarRadiationHigh',
        display: 'Solar Radiation - High',
        units: 'W/m2',
    },
    {
        variable: 'tempAvg',
        display: 'Temperature - Average',
        units: '°C',
    },
    {
        variable: 'tempHigh',
        display: 'Temperature - High',
        units: '°C',
    },
    {
        variable: 'tempLow',
        display: 'Temperature - Low',
        units: '°C',
    },
    {
        variable: 'uvHigh',
        display: 'Ultraviolet Radiation - High',
        units: 'W/m2',
    },
    {
        variable: 'windchillAvg',
        display: 'Wind Chill - Average',
        units: '°C',
    },
    {
        variable: 'windchillHigh',
        display: 'Wind Chill - High',
        units: '°C',
    },
    {
        variable: 'windchillLow',
        display: 'Wind Chill - Low',
        units: '°C',
    },
    {
        variable: 'winddirAvg',
        display: 'Wind Direction - Average',
        units: 'degrees',
    },
    {
        variable: 'windgustAvg',
        display: 'Wind Gust - Average',
        units: 'm/s',
    },
    {
        variable: 'windgustHigh',
        display: 'Wind Gust - High',
        units: 'm/s',
    },
    {
        variable: 'windgustLow',
        display: 'Wind Gust - Low',
        units: 'm/s',
    },
    {
        variable: 'windspeedAvg',
        display: 'Wind Speed - Average',
        units: 'm/s',
    },
    {
        variable: 'windspeedHigh',
        display: 'Wind Speed - High',
        units: 'm/s',
    },
    {
        variable: 'windspeedLow',
        display: 'Wind Speed - Low',
        units: 'm/s',
    },
];

export default AVAILABLE_VARIABLES;
