import React, {useState, useEffect, useRef} from 'react'
import {Link} from 'gatsby'
import Layout from "../components/Layout";
import {Form, Button, FormControl} from 'react-bootstrap'


const search = ({location}) => {

    const { state = {} } = location
   

    const { data } = state
    let result = "result: " +data

    // const btnRef = useRef(null);
    // const [query, setQuery] = useState(initQuery)
    // const [result, setResult] = useState("")

    // function handleChange(e){
    //     e.preventDefault()
    //     setQuery(e.target.value)
    // }
    // function handleClick(){
    //     let resultData = query;
    //     setResult(resultData)
    // }

    // useEffect(() => {
    //     btnRef.current.click()
    // }, [])
    return (
      <Layout>
        <div>
          {/* <h4>you searched {result}</h4> */}
          <h className="general-text">{result}</h>
        </div>
      </Layout>
    );
}

export default search
