import { useEffect, useState } from 'react';

// 3rd libs
import axios from 'axios';

// components & styles
import { Styles as sx } from './styles';
import { Box } from '@mui/material';
import DynamicForm from 'src/components/dynamic-form';

const Home = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState();

  useEffect(() => {
    axios.get('https://ulventech-react-exam.netlify.app/api/form')
      .then(res => {
        setData(res.data.data)
      })
      .catch( err => {
        setError(err)
      })
  }, []);

  if (error) return <>Error!</>;
  if (!data) return <>Loading...</>;
  return (
    <Box sx={sx.root}>
      {data?.map?.((e, i) => (
        <Box sx={sx.field} key={i}>
          <DynamicForm {...e} />
        </Box>
      ))}
    </Box>
  )
}

export default Home
