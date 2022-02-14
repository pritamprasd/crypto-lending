import { Typography } from '@mui/material'
import { Box } from '@mui/system'

const index = ({forText}: {forText: string}) => {
  const bgColor = () => forText === "borrowers" ? "#FDF4E3" : "#F6E7EB"
  return (
    <Box sx={{background: `${bgColor()}`, mt: "4rem", p: "3rem 30%", textAlign: "center", borderRadius: "8px"}}>
      <Typography sx={{fontSize: "28px", fontWeight: "500"}}>{`No ${(forText == 'lenders' ? 'lenders' : 'borrowers')} yet!`}</Typography>
      <Typography sx={{ fontWeight: "500"}}>{`We will notify you when a prospective  ${(forText == 'lenders' ? 'lenders' : 'borrowers')} is interested to negotiate a deal with you.`}</Typography>
    </Box>
  )
}

export default index