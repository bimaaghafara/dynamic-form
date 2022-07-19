import { useEffect, useState } from 'react';

// 3rd libs
import axios from 'axios';
import { useFormik } from 'formik';

// components & styles
import { Styles as sx } from './styles';
import { Box, Typography } from '@mui/material';
import { Form, DynamicForm } from 'src/components/dynamic-form';

const Home = () => {
  const [data, setData] = useState<Form[]>();
  const [error, setError] = useState();

  const formik = useFormik<
    {[key: string]: Form["value"]}
  >({
    initialValues: {},
    onSubmit: () => {}
  })

  useEffect(() => {
    axios.get<{
      data: Form[],
      message: string,
      success: boolean
    }>('https://ulventech-react-exam.netlify.app/api/form')
      .then(res => {
        setData(res.data.data)
        formik.setValues(
          res.data.data.reduce((acc, curr) => (
            {...acc, [curr.fieldName]: curr.value}
          ), {})
        )
      })
      .catch( err => {
        setError(err)
      })
  }, []);

  const renderContent = () => {
    if (error) return <Box sx={sx.field}>Error!</Box>;
    if (!data) return <Box sx={sx.field}>Loading . . .</Box>;
    return <>
      {data?.map?.((e, i) => (
        <Box sx={sx.field} key={i}>
          <DynamicForm
            {...e}
            value={formik.values[e.fieldName]}
            onChange={formik.handleChange}
          />
        </Box>
      ))}
    </>
  }

  return (
    <Box sx={sx.root}>
      <Typography variant="h5">
        Dynamic Form
      </Typography>
      {renderContent()}
    </Box>
  )
}

export default Home
