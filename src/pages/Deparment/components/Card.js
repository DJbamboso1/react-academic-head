import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography
} from '@material-ui/core';
import { green, yellow } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import SubjectIcon from '@material-ui/icons/Subject';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    green: {
      color: '#fff',
      backgroundColor: green[500],
      width: 100,
      height: 100,
    },
    yellow: {
        color: '#fff',
        backgroundColor: yellow[500],
        width: 100,
        height: 100,
      },
    icon: {
        width: 80,
        height: 80,
    }
  }));

function CardComponent({ title, total, index }) {
    const classes = useStyles();
    return (
        <Card style={{margin: '15px 10px'}}>
            <CardContent>
                <Grid style={{display: 'flex', justifyContent: 'space-around'}}>
                    <Grid item >
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="h6"
                        >
                            {title}
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h3"
                        >
                            {total}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {index===1 ? (<Avatar className={classes.green}>
                            <PeopleIcon className={classes.icon}/>
                        </Avatar>): 
                        (<Avatar className={classes.yellow}>
                        <SubjectIcon className={classes.icon}/>
                    </Avatar>)
                        }
                        
                    </Grid>
                </Grid>
                            
            </CardContent>
        </Card>
    );

};

export default CardComponent;

