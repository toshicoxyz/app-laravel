import React from 'react';

const CityTours = () => {
    const text = "City Tours";
    const colors = ['#FFD700', '#FF6347', '#00FF7F', '#1E90FF', '#8A2BE2', '#FF8C00']; // Colores peruanos (puedes ajustarlos según prefieras)

    const spanStyle = {
        display: 'inline-block',
        margin: '0 2px', // Espacio entre letras
    };

    const colorizeText = (text, colors) => {
        return text.split('').map((char, index) => (
            <span key={index} style={{ ...spanStyle, color: colors[index % colors.length] }}>
                {char}
            </span>
        ));
    };

    return (
        <div className='mt-5'>
            <h1>{colorizeText(text, colors)}</h1>
        </div>
    );
};

export default CityTours;
