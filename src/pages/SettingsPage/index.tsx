import {
    Avatar,
    Box, Button, Checkbox,
    Container,
    createTheme,
    CssBaseline,
    FormControlLabel, Grid, IconButton, Link, List, ListItem, ListItemAvatar, ListItemText,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import axios, {AxiosResponse} from "axios";
import { url } from "../utils";

const theme = createTheme();

const PlaceItem = (props: {
    place: string,
    showAsteroid: boolean,
    remove: () => void,
    setShowAsteroid: (value: boolean) => void
}) => {
    const {place, showAsteroid, setShowAsteroid, remove} = props
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete">
                    <Checkbox checked={showAsteroid} onChange={e => setShowAsteroid(e.target.checked)}/>
                </IconButton>
            }
        >
            <ListItemAvatar>
                <Avatar>
                    <DeleteIcon onClick={remove}/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={place}
            />
        </ListItem>
    )
}



const SettingsPage = (props: {
    phoneFirstPart: string,
    phoneSecondPart: string,
    setPhoneFirstPart: (value: string) => void,
    setPhoneSecondPart: (value: string) => void,
}) => {
    const navigate = useNavigate()
    const {phoneSecondPart, phoneFirstPart, setPhoneFirstPart, setPhoneSecondPart} = props
    const [places, setPlaces] = useState<{ place: string, show_asteroid: boolean }[]>([])
    const [showExplanation, setShowExplanation] = useState(false)
    const [newPlace, setNewPlace] = useState('')

    const setShowAsteroid = (place: string, value: boolean) => {
        const index = places.findIndex(p => p.place === place)
        console.log(index)
        if (index !== -1) {
            const pair = places[index]
            pair.show_asteroid = value
            const newList = [...places.slice(0, index), pair, ...places.slice(index + 1)]
            setPlaces(newList)
        }
    }

    const addPlace = (place: string) => {
        if (place.length === 0 || places.findIndex(p => p.place === place) !== -1) {
            return
        }
        const pair = {
            place: place,
            show_asteroid: false
        }
        const newList = [...places, pair]
        setPlaces(newList)
    }

    const remove = (place: string) => {
        let index = -1
        if ((index = places.findIndex(p => p.place === place)) === -1) {
            return
        }
        const newList = [...places.slice(0, index), ...places.slice(index + 1)]
        setPlaces(newList)
    }

    const update = () => {
        console.log(places)
        axios({
            url: url + "places",
            method: 'post',
            data: {
                pairs: places,
                show_explanation: showExplanation
            }
        })
            .then(resp => {
                console.log(resp)
                navigate("/")
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios({
            url: url + "places",
            method: 'get'
        })
            .then((resp: AxiosResponse<{
                pairs: {
                    place: string,
                    show_asteroid: boolean
                }[],
                show_explanation: boolean
            }>) => {
                console.log(resp)
                setPlaces(resp.data.pairs)
                setShowExplanation(resp.data.show_explanation)
            })
            .catch(err =>  console.log(err))
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="phone first part"
                            autoFocus
                            value={phoneFirstPart}
                            onChange={e => setPhoneFirstPart(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="phone second part"
                            autoFocus
                            value={phoneSecondPart}
                            onChange={e => setPhoneSecondPart(e.target.value)}
                        />
                        <List>
                            {
                                places.map((p, index) =>
                                    <PlaceItem
                                        place={p.place}
                                        showAsteroid={p.show_asteroid}
                                        remove={() => remove(p.place)}
                                        setShowAsteroid={value => setShowAsteroid(p.place, value)}
                                        key={"place_" + index}
                                    />)
                            }
                        </List>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="places"
                            autoFocus
                            value={newPlace}
                            onChange={e => setNewPlace(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={() => {
                                addPlace(newPlace)
                            }}
                        >
                            add place
                        </Button>
                        <FormControlLabel control={<Checkbox checked={showExplanation}
                                                             onChange={e => setShowExplanation(e.target.checked)}/>}
                                          label="show explanation"/>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={() => {
                                update()
                            }}
                        >
                            update
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default SettingsPage