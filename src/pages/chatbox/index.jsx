import React from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Fab from '@mui/material/Fab'
import SendCircleOutline from 'mdi-material-ui/SendCircleOutline'
import { useSession } from 'next-auth/react'
import { useRef } from 'react'
import { useSocketStore } from 'src/@core/store/socket-store'
import { useChatBoxStore } from 'src/@core/store/chatbox-store'
import { DateTime } from 'luxon'
import { useEffect } from 'react'

const Chat = () => {
  const socket = useSocketStore(s => s.socket)
  const messenges = useChatBoxStore(s => s.messenges)
  const dispatchMessenge = useChatBoxStore(s => s.dispatchMessenge)

  const session = useSession()
  const inputField = useRef(null)
  const containerChat = useRef(null)

  const { data: user } = session
  const userInfo = user?.user.user

  const handleDispatchMessenge = () => {
    const inputValue = inputField.current.querySelector('input').value

    if (inputValue && socket) {
      const mess = {
        message: inputValue,
        userId: userInfo._id,
        bot: false,
        createdAt: new Date().toISOString()
      }

      console.log(mess);
      socket.emit('sendChat', { message: inputValue, userId: userInfo._id })
      dispatchMessenge(mess)
      inputField.current.querySelector('input').value = ''
    }
  }

  useEffect(() => {
    if (containerChat.current) {

    }

  }, [])


  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h5' className='header-message'>
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper}>
        <Grid item xs={3}>
          <List>
            <ListItem button key='RemySharp'>
              <ListItemIcon>
                <Avatar alt='Remy Sharp' src={userInfo?.avatar} />
              </ListItemIcon>
              <ListItemText primary={userInfo?.fullname}></ListItemText>
            </ListItem>
          </List>
          <Divider />
        </Grid>
        <Grid item xs={9}>
          <List
            style={{
              height: '500px',
              overflow: 'auto'
            }}
            ref={containerChat}
          >
            {messenges.map((mess, idx) => {
              const isBot = mess.bot ? 'left' : 'right';
              const date = DateTime.fromISO(mess.createdAt);

              return <ListItem key={idx}>
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText align={isBot} primary={mess.message}></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText align={isBot} secondary={date.toRelative()}></ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
            })}
          </List>
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
              <TextField id='outlined-basic-email' label='Type Something' fullWidth ref={inputField} />
            </Grid>
            <Grid xs={1} align='right'>
              <Fab color='primary' aria-label='add' onClick={handleDispatchMessenge}>
                <SendCircleOutline />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Chat
