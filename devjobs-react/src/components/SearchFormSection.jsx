import { useId, useState } from "react"

const useSearchForm = ({idText, idTechnology, idLocation, idExperienceLevel, onSearch, onTextFilter}) => {
  const [searchText, setSearchText] = useState('')
  
  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const filters = {
      search: formData.get(idText),
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel)
    }

    onSearch(filters)
  }

  const handleTextChange = (event) => {
    const text = event.target.value
    searchText(text)
    onTextFilter(text)
  }

  return{
    searchText,
    handleSubmit,
    handleTextChange
  }
}

export function SearchFormSection({ onTextFilter, onSearch }) {
  const idText = useId()
  const idTechnology = useId()
  const idLocation = useId()
  const idExperienceLevel = useId()
  
  const {
    handleSubmit, 
    handleTextChange
  } = useSearchForm({ idText, idTechnology, idLocation, idExperienceLevel, onSearch, onTextFilter })
  

  return (
    <section className="jobs-search">
      <h1>Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form onChange={handleSubmit} id="empleos-search-form" role="search">
        <div className="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>

          <input name={idText} id={idText} type="text"
            placeholder="Buscar trabajos, empresas o habilidades"
            onChange={handleTextChange} />

          <button type="submit" style={{ position: 'absolute', right: '4px' }}>Buscar</button>
        </div>

        <div className="search-filters">
          <select name={idTechnology} id={idTechnology}>
            <option value="">Todas las tecnologías</option>

            <optgroup label="Frontend">
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JavaScript</option>
              <option value="react">React</option>
              <option value="vue">Vue</option>
            </optgroup>

            <optgroup label="Backend">
              <option value="node">Node.js</option>
              <option value="python">Python</option>
              <option value="php">PHP</option>
              <option value="java">Java</option>
            </optgroup>

            <optgroup label="Base de datos">
              <option value="mysql">MySQL</option>
              <option value="mongodb">MongoDB</option>
              <option value="postgresql">PostgreSQL</option>
            </optgroup>
          </select>

          <select name={idLocation} id={idLocation}>
            <option value="">Todas las ubicaciones</option>

            <optgroup label="España">
              <option value="madrid">Madrid</option>
              <option value="barcelona">Barcelona</option>
              <option value="valencia">Valencia</option>
            </optgroup>

            <optgroup label="México">
              <option value="cdmx">Ciudad de México</option>
              <option value="monterrey">Monterrey</option>
              <option value="guadalajara">Guadalajara</option>
            </optgroup>

            <hr />

            <option value="remoto">🌍 Remoto</option>
          </select>

          <select name={idExperienceLevel} id={idExperienceLevel}>
            <option value="">Todos los niveles</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>

            <hr />

            <option value="intern">Prácticas</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>
      </form>

      <span id="filter-selected-value"></span>
    </section>
  )
}