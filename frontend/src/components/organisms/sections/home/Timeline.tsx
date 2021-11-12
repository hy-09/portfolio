import { AppBar, Grid, makeStyles, Tab, Tabs } from "@material-ui/core"
import { Favorite, Person, PersonPinCircleOutlined } from "@material-ui/icons"
import { ChangeEvent, FC, useState } from "react"
import { useAppSelector } from "../../../../app/hooks"
import Posts from "../../Posts"
import Section from "../../Section"

const Timeline: FC = () => {
    const [value, setValue] = useState(0);
    const loginUser = useAppSelector(state => state.auth.loginUser)
    const myPosts = useAppSelector(state => state.post.myPosts)
    const likePosts = useAppSelector(state => state.post.posts).filter(post => post.likeUsers.includes(loginUser.id))

    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    }
    function a11yProps(index: any) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    
    return (
        <Grid item xs={12}>
            <Section title="タイムライン">
                <div style={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Tabs 
                            value={value} 
                            onChange={handleChange} 
                            aria-label="simple tabs example"
                        >
                            <Tab icon={<Person />} aria-label="person" {...a11yProps(0)} />
                            <Tab icon={<Favorite />} aria-label="favorite" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    {value == 0 && (
                        <Posts allPosts={myPosts} isDeletable={true} />
                    )}
                    {value == 1 && (
                        <Posts allPosts={likePosts} />
                    )}
                </div>
            </Section>
        </Grid>
    )
}

export default Timeline
