import React from 'react'
import {FormikHelpers, useFormik} from 'formik'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {useAppDispatch} from 'common/hooks/useAppDispatch';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material'
import {selectIsLoggedIn} from "features/Login/login.selectors";
import {authThunks} from "features/Login/auth-reducer";
import {LoginParamsType} from "common/api/auth-api";
import style from './Login.module.css'
import {ResponseType} from "common/types";

export const Login = () => {

    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector(selectIsLoggedIn);

    const formik = useFormik({
        validate: (values) => {
            // if (!values.email) {
            //     return {
            //         email: 'Email is required'
            //     }
            // }
            // if (!values.password) {
            //     return {
            //         password: 'Password is required'
            //     }
            // }

        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: (values: LoginParamsType, formikHelpers: FormikHelpers<LoginParamsType>) => {
            dispatch(authThunks.login(values))
                .unwrap()
                .then(res => {
                })
                .catch((reason: ResponseType) => {
                    reason.fieldsErrors.forEach(f => {
                        formikHelpers.setFieldError(f.field, f.error)
                    })
                })
        },
    })

    if (isLoggedIn) {
        return <Navigate to={"/"}/>
    }


    return <Grid container justifyContent="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>
                            To log in get registered <a href={'https://social-network.samuraijs.com/'}
                                                        target={'_blank'}>here</a>
                        </p>
                        <p>
                            or use common test account credentials:
                        </p>
                        <p> Email: free@samuraijs.com
                        </p>
                        <p>
                            Password: free
                        </p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email ? <div className={style.fieldError}>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.errors.password ? <div className={style.fieldError}>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps("rememberMe")}
                                checked={formik.values.rememberMe}
                            />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
