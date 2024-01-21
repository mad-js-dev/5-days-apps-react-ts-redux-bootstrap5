import Layout from '../components/templates/layout/Layout'

export default function About() {
  return (
    <>
      <Layout title="About this app" backLink={true}>
        <div>This is the about page content</div>
      </Layout>
    </>
  );  
  }