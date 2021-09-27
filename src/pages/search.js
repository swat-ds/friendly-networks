import React, {useState, useEffect, useRef} from 'react'
import {Link, graphql} from 'gatsby'
import Fuse from 'fuse.js'
import Layout from "../components/Layout";
import {Form, Button, FormControl} from 'react-bootstrap'


const search = ({location, data}) => {
   
    let result = []

    if (typeof window !== "undefined" && typeof document !== "undefined") {

      const { state = {} } = location;
      const { searchQuery } = state;

      console.log(data);

      const journalFuse = new Fuse(data.journals.nodes, {
        keys: ["prefixed"],
      });

      const constellationFuse = new Fuse(data.constellations.nodes, {
        keys: ["nameEntries.original"],
      });


      console.log(constellationFuse.search(searchQuery));
      result.push(searchQuery)

    }
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
          <h className="general-text">{result[0]}</h>
        </div>
      </Layout>
    );
}

export default search

export const query = graphql`
  query {
    constellations: allConstellation {
      nodes {
        id
        arkId
        nameEntries {
          original
          components {
            dataType
            id
            order
            text
            type {
              term
            }
          }
          id
        }
        occupations {
          term {
            term
          }
        }
        subjects {
          term {
            term
          }
        }
        entityType {
          term
        }
        biogHists {
          language {
            language {
              term
              description
            }
          }
          text
        }
        places {
          confirmed
          original
          note
          geoplace {
            administrationCode
            countryCode
            id
            latitude
            longitude
            name
            uri
          }
        }
        relations {
          sourceArkID
          targetArkID
          sourceConstellation
          targetConstellation

          type {
            term
          }
          content
          note
          id
        }
        sameAsRelations {
          uri
        }
        subjects {
          term {
            term
          }
        }
        genders {
          term {
            term
            type
          }
        }
        dates {
          fromDate
          fromDateOriginal
          toDate
          toDateOriginal
        }
      }
    }

    journals: allCetei {
      totalCount
      nodes {
        prefixed
        parent {
          ... on File {
            id
            name
          }
        }
      }
    }
  }
`;