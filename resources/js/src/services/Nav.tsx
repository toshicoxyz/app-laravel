import React from "react";
import LugaresTuristicos from "../components/LugaresTuristicos";
import { Section } from "../types/Section";
import Regiones from "../components/Regiones";

export const renderSelectedOption = (selectedOption: Section) => {
    switch (selectedOption) {
        case "Lugares Turisticos":
            return <LugaresTuristicos />;
        case "Regiones":
            return <Regiones />;
        default:
            return <LugaresTuristicos />;
    }
};
