import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        backgroundColor: '#e0e0e0',
        fontWeight: 'bold',
    
    },
});

export default function NavBar() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Clients" component={Link} to={"/"} />
                <Tab label="Actions" component={Link} to={"/actions"} />
                <Tab label="Analytics" component={Link} to={"/analytics"} />
            </Tabs>
        </Paper>
    );
}