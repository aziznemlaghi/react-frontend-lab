const About = () => {
  return (
    <div className="container mt-4">
      <h1>À propos</h1>
      <p>Cette application a été développée avec React, Bootstrap, Node.js et Express.</p>
      <div className="alert alert-info">
        <strong>Technologies utilisées :</strong>
        <ul>
          <li>Frontend: React.js avec React Router</li>
          <li>Styling: Bootstrap 5</li>
          <li>Backend: Node.js avec Express</li>
          <li>Communication: Axios pour les appels API</li>
        </ul>
      </div>
    </div>
  );
};

export default About;