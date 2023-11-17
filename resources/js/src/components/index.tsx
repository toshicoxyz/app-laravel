import React from "react"
import { CategoriaCRUD } from "./CategoriaCRUD"
import IconReact from "../icon/IconReact"
import IconLaravel from "../icon/IconLaravel"
import { useState } from "react"
import { CursoCRUD } from "./CursoCRUD"

const App = () => {
    const [section, setSection] = useState<"categoria" | "curso">("curso")

    return <div className="text-center">
        <IconReact /> + <IconLaravel />
        {section === "categoria" && <CategoriaCRUD />}
        {section === "curso" && <CursoCRUD />}
    </div>
}

export default App
