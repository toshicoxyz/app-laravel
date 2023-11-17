import React from "react"
import { CategoriaCRUD } from "./CategoriaCRUD"
import IconReact from "../icon/IconReact"
import IconLaravel from "../icon/IconLaravel"
import { useState } from "react"
import { CursoCRUD } from "./CursoCRUD"

const App = () => {
    const [section, setSection] = useState<"categoria" | "curso">("curso")

    return <div className="text-center">
        <div>
            <IconReact /> + <IconLaravel />
        </div>
        <div className="btn-group " role="group" aria-label="Basic radio toggle button group" >
            <input
                type="radio"
                className="btn-check"
                name="categoria"
                id="categoria"
                autoComplete="off"
                checked={section === "categoria"}
                onChange={() => setSection("categoria")} />
            <label className="btn btn-outline-primary" htmlFor="categoria">Categoría</label>

            <input type="radio"
                className="btn-check"
                name="curso" id="curso"
                autoComplete="off"
                checked={section === "curso"}
                onChange={() => setSection("curso")} />
            <label className="btn btn-outline-primary" htmlFor="curso">Curso</label>
        </div>
        {section === "categoria" && <CategoriaCRUD />}
        {section === "curso" && <CursoCRUD />}
    </div>
}

export default App
