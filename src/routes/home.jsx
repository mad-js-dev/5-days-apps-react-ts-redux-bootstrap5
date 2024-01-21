import "./home.scss"

import Tasklist from '../components/organisms/TaskList/TaskList';
import Layout from '../components/templates/layout/Layout'

export default function Home() {
    return (
      <>
        
        <Layout title="To do tasks">
          <Tasklist />
        </Layout>
      </>
    );  
  }