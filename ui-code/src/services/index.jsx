import Axios from "../config/Axios"

export const login = (wallet) => {
    return Axios.post('/login', wallet)
}

export const postBorrowAd = (ad) => {
    return Axios.post('/ads/borrow', ad)
}

export const postLendAd = (ad) => {
    return Axios.post('/ads/lend', ad)
}

export const getBorrowersAd = () => {
    return Axios.get('/ads/borrow')
}

export const getLendersAd = () => {
    return Axios.get('/ads/lend')
}

export const negotiation = (data) => {
    return Axios.post('/negotiation', data)
}

export const getNegotiation = () => {
    return Axios.get('/negotiation')
}

export const engageNegotiation = (negotiationId) => {
    return Axios.post(`/engagenegotiation/${negotiationId}`)
}

export const finalOffer = (negotiationId, data) => {
    return Axios.post(`/finaloffer/${negotiationId}`, data)
}

export const acceptOffer = (negotiationId) => {
    return Axios.post(`/acceptoffer/${negotiationId}`)
}

export const loanpaid = (negotiationId) => {
    return Axios.post(`/loanpaid/${negotiationId}`)
}

export const loanreceived = (negotiationId) => {
    return Axios.post(`/loanreceived/${negotiationId}`)
}

export const borrowerpays = (negotiationId) => {
    return Axios.post(`/borrowerpays/${negotiationId}`)
}

export const lenderpays = (negotiationId) => {
    return Axios.post(`/lenderpays/${negotiationId}`)
}