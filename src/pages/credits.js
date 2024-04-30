import React from 'react'
import Layout from '../components/Layout'
import { SEO } from "../components/SEO";
import {Row, Col, Card} from "react-bootstrap";
import "../styles/background.scss";
import "../styles/styles.scss"

const credits = () => {
		return (
			<Layout>
					<Row>
            <Col className="background-col">
    					<Card bg="primary" className="general-text background">
                <Card.Body>
									<h1>Credits</h1>
	      					<p>Friendly Networks is made possible with support from the H. David and Joyce E. Hunt Family Foundation Special Projects Fund.</p>

	                <h2>Staff</h2>

	                <h3>Project Manager (2021–2024)</h3>
	                <ul style={{listStyleType: "none"}}>
	                  <li>James Truitt, Digital Archivist</li>
	                </ul>

	                <h3>Supporting Staff (2003–2024)</h3>
	                <ul style={{listStyle: "none"}}>
	                  <li>Celia Caust-Ellenbogen, Associate Curator</li>
	                  <li>Chris Densmore, Curator of Friends Historical Library</li>
	                  <li>Nabil Kashyap, Digital Scholarship Librarian</li>
	                  <li>Jordan Landes, Curator of Friends Historical Library</li>
	                  <li>Roberto Vargas, Head of Research and Instruction</li>
	                  <li>Pat O&rsquo;Donnell, Archivist</li>
	                  <li>Chelcie Juliet Rowell, Writing Associate</li>
	                  <li>Anthony Weed, Academic Web Developer</li>
	                </ul>

	                <p>
	                Thanks also to Susan Dreher for her work on the project logo and to Howard Ding for his assistance troubleshooting the image viewer.
	                </p>

					<h2>Student Contributors</h2>

					<h3>Web developer</h3>
					<ul style={{listStyle: "none"}}>
						<li>Zakir Hossain &rsquo;24</li>
					</ul>

					<h3>Research Assistants</h3>
					<ul style={{listStyle: "none"}}>
						<li>Lyra Edgerington &rsquo;27</li>
						<li>Ayodeji George &rsquo;21</li>
						<li>Anna Chaewon Jeong &rsquo;23</li>
					</ul>

					<p>
					Thanks also to Will Ball &rsquo;23 and Zahara Martinez &rsquo;23 for their work regularizing the transcripts of Evans's journal.
					</p> 

					<h3>Transcribers</h3>
					<ul style={{listStyle: "none"}}>
						<li>Aaron Brecher &rsquo;10</li>
						<li>Sikandra Christian &rsquo;06</li>
						<li>Jessica Engebretson &rsquo;09</li>
						<li>Chris Geissler &rsquo;13</li>
						<li>Yuan Liu &rsquo;09</li>
						<li>Finlay Logan &rsquo;08</li>
						<li>Jonathan Peters &rsquo;09</li>
						<li>Claudia Seixas &rsquo;10</li>
						<li>Isa St. Clair &rsquo;11</li>
						<li>Chris Wickham &rsquo;12</li>
					</ul>
						</Card.Body>
              </Card>
            </Col>
					</Row>
			</Layout>
		)
}

// Enrich <head> tag
export const Head = () => (
  <SEO title="Credits - Friendly Networks"/>
)

export default credits
