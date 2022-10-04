import React, {useState, useEffect} from "react";
import QuestionItem from './QuestionItem'

function QuestionList() {
  // console.log(questions)
  
  // function handleClick(e) {
  //   handleDelete(e.target.id)
  // }

  // function onChange(e) {
  //   const id = e.target.id
  //   const index = e.target.value

  //   handleChange(id, index)
  // }

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(res => res.json())
      .then(data => setQuestions(data))
  }, [questions])



  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    })
  }

  function handleChange(id, index) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        correctIndex: parseInt(index)
      })
    })
    .then(res => res.json())
    .then(updatedItem => console.log(updatedItem))
  }

  const prompts = questions.map(question => {
    // console.log(question.answers[0])
    return (
      <QuestionItem question={question} key={question.id} handleChange={handleChange} handleDelete={handleDelete} />
    )
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{prompts}</ul>
    </section>
  );
}

export default QuestionList;
