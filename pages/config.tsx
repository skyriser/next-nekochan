import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import NativeSelect from '@mui/material/NativeSelect'

export async function getServerSideProps (context) {
  try {
    const roomId = process.env.IRUCA_ROOM_ID
    const apiToken = process.env.IRUCA_API_TOKEN

    const url = `https://iruca.co/api/rooms/${roomId}/members`;
    const members = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'X-Iruca-Token': apiToken
      }
    }).then(res => res.json());

    return {
        props: {
          members,
        }
    }
  } catch (e) {
    console.log(e)
    return {
      props: {
        members: [],
      }
    }
  }
}

export default function Iruca({ members }) {
  return (
    <main>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Iruca | Member Select
        </InputLabel>
        <NativeSelect>
          {
            members.map(member => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.status})
              </option>
            ))
          }
        </NativeSelect>
      </FormControl>
    </main>
  )
}
