import { useState } from "react"

const useForm = defaults => {
  const [values, setValues] = useState(defaults)

  const updateValues = event => {
    // check if number
    let value = event.target.value
    if (event.target.type === "number") {
      value = parseInt(value)
    }

    setValues({
      ...values,
      [event.target.name]: value,
    })
  }

  const onSubmitUseForm = () => {
    setValues(defaults)
  }

  return { values, updateValues, onSubmitUseForm }
}

export default useForm
