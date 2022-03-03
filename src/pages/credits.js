import React from 'react'
import Layout from '../components/Layout'
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

	                <h3>Project Manager (2021–2023)</h3>
	                <ul style={{listStyleType: "none"}}>
	                  <li>James Truitt, Archives Technician</li>
	                </ul>

	                <h3>Supporting Staff (2003–2023)</h3>
	                <ul style={{listStyle: "none"}}>
	                  <li>Celia Caust-Ellenbogen, Archivist</li>
	                  <li>Chris Densmore, Curator of Friends Historical Library</li>
	                  <li>Nabil Kashyap, Digital Scholarship Librarian</li>
	                  <li>Jordan Landes, Curator of Friends Historical Library</li>
	                  <li>Emily Higgs Kopin, Digital Archivist</li>
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
	      						<li>Zakir Hossain &rsquo;23</li>
	      					</ul>

	      					<h3>Research Assistants</h3>
	      					<ul style={{listStyle: "none"}}>
	      						<li>Ayodeji George &rsquo;21</li>
	      						<li>Anna Chaewon Jeong &rsquo;23</li>
	      					</ul>

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

export default credits
