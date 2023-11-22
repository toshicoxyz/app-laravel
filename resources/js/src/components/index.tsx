import React from "react"
import { useState } from "react"
import { Toaster } from 'react-hot-toast';
import { Section } from "../types/Section"
import { renderSelectedOption } from "../services/Nav"
import CityTours from "./Title"

const App = () => {
    const [selectedOption, setSelectedOption] = useState<Section>('Lugares Turisticos');


    return <div className="text-center">
        <Toaster />
        <CityTours />
        <h2
            className={`h2-option ${selectedOption === "Regiones" ? "text-primary font-weight-bold" : "text-secondary"}`}
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedOption("Regiones")}
        >
            Regiones
        </h2>
        <h2
            className={`h2-option ${selectedOption === "Lugares Turisticos" ? "text-danger font-weight-bold" : "text-secondary"}`}
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedOption("Lugares Turisticos")}
        >
            Lugares Turísticos
        </h2>

        {renderSelectedOption(selectedOption)}
    </div>
}

export default App
