import { useEffect, useState } from 'react';

// 3rd libs
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';

// components & styles
import { Styles as sx } from './styles';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { FormProps, DynamicForm } from 'src/components/dynamic-form';

type FormValues = {
  [key: string]: string | number | undefined;
  firstName: string;
  lastName: string;
  emailAddress: string;
  gender?: string;
  age?: number;
  testimonial?: string;
}

type SnackbarProps = {
  open?: boolean;
  message?: string;
  severity?: 'error' | 'info' | 'success' | 'warning';
} | undefined;

const Home = () => {
  const [snackbar, setSnackbar] = useState<SnackbarProps>();
  const [formsProps, setFormsProps] = useState<FormProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState();

  const onSubmit = (values: FormValues) => {
    setIsLoading(true);
    axios.post<{
      data: FormValues,
      message: string,
      success: boolean
    }>("https://ulventech-react-exam.netlify.app/api/form", values)
      .then(res => {
        setIsLoading(false);
        setSnackbar({
          open: true,
          severity: 'success',
          message: res.data.message || 'Success!',
        });
      })
      .catch((err: AxiosError<{ message: string; success: boolean; }>) => {
        setIsLoading(false);
        setSnackbar({
          open: true,
          severity: 'error',
          message: err?.response?.data?.message || 'Error!',
        });
      })
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      emailAddress: ''
    },
    onSubmit,
  })

  useEffect(() => {
    axios.get<{
      data: FormProps[],
      message: string,
      success: boolean
    }>('https://ulventech-react-exam.netlify.app/api/form')
      .then(res => {
        setFormsProps(res.data.data)
        formik.setValues(
          res.data.data.reduce((acc, curr) => (
            {...acc, [curr.fieldName]: curr.value}
          ), formik.values)
        )
      })
      .catch( err => {
        setError(err)
      })
  }, []);

  const renderContent = () => {
    if (error) return <Box sx={sx.field}>Error!</Box>;
    if (!formsProps) return <Box sx={sx.field}>Loading . . .</Box>;
    return <>
      {formsProps?.map?.((formProps, i) => (
        <Box sx={sx.field} key={i}>
          <DynamicForm
            {...formProps}
            value={formik.values[formProps.fieldName]}
            onChange={formik.handleChange}
          />
        </Box>
      ))}
      <LoadingButton
          onClick={() => formik.handleSubmit()}
          endIcon={<SendIcon />}
          loading={isLoading}
          loadingPosition="end"
          variant="contained"
        >
          Submit
        </LoadingButton>
    </>
  }

  return (
    <Box sx={sx.root}>
      <Typography variant="h5">
        Dynamic Form
      </Typography>
      {renderContent()}

      <Snackbar
        open={snackbar?.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar(undefined)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Box>
          {snackbar?.open && (
            <Alert
              onClose={() => setSnackbar(undefined)}
              severity={snackbar?.severity}
              sx={{ width: '100%' }}
            >
              {snackbar?.message}
            </Alert>
          )}
        </Box>
      </Snackbar>
    </Box>
  )
}

export default Home
