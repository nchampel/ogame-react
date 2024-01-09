import {
    Card,
    Typography
  } from '@mui/material';
  import numeral from 'numeral';
import { useNavigate } from 'react-router-dom';


const Buildings = (props) => {
    // const isMounted = useMounted();
    const { buildingsResources, buildings } = props
    // console.log(buildingsResources.metal)
    
    // const navigate = useNavigate();

    // if (!isAuthenticated) {
    //     navigate(`/login`)
    // }
    
    return (
    <>
        <Card sx={{
        marginBottom: '15px',
        marginTop: '15px'
        }}>
            <Typography>{`Mine de métal : ${buildings.metal}`}</Typography>
            <Typography>{`${numeral(buildingsResources.metal.production).format('0,000,000,000,000').replaceAll(',', ' ')} /h`}</Typography>
            <Typography>{`Métal : ${numeral(buildingsResources.metal.metal).format('0,000,000,000,000').replaceAll(',', ' ')} Cristal : ${numeral(buildingsResources.metal.crystal).format('0,000,000,000,000').replaceAll(',', ' ')} Energie : ${numeral(buildingsResources.metal.next_energy - buildingsResources.metal.energy).format('0,000,000,000,000').replaceAll(',', ' ')}`}</Typography>
        </Card>
        <Card sx={{
        marginBottom: '15px'
        }}>
            <Typography>{`Mine de cristal : ${buildings.crystal}`}</Typography>
            <Typography>{`${numeral(buildingsResources.crystal.production).format('0,000,000,000,000').replaceAll(',', ' ')} /h`}</Typography>
            <Typography>{`Métal : ${numeral(buildingsResources.crystal.metal).format('0,000,000,000,000').replaceAll(',', ' ')} Cristal : ${numeral(buildingsResources.crystal.crystal).format('0,000,000,000,000').replaceAll(',', ' ')} Energie : ${numeral(buildingsResources.crystal.next_energy - buildingsResources.crystal.energy).format('0,000,000,000,000').replaceAll(',', ' ')}`}</Typography>
        </Card>
        <Card sx={{
        marginBottom: '15px'
        }}>
            <Typography>{`Synthétiseur de deutérium : ${buildings.deuterium}`}</Typography>
            <Typography>{`${numeral(buildingsResources.deuterium.production).format('0,000,000,000,000').replaceAll(',', ' ')} /h`}</Typography>
            <Typography>{`Métal : ${numeral(buildingsResources.deuterium.metal).format('0,000,000,000,000').replaceAll(',', ' ')} Cristal : ${numeral(buildingsResources.deuterium.crystal).format('0,000,000,000,000').replaceAll(',', ' ')} Energie : ${numeral(buildingsResources.deuterium.next_energy - buildingsResources.deuterium.energy).format('0,000,000,000,000').replaceAll(',', ' ')}`}</Typography>
        </Card>
        <Card sx={{
        marginBottom: '15px'
        }}>
            <Typography>{`Centrale solaire : ${buildings.energy}`}</Typography>
            <Typography>{` + ${numeral(buildingsResources.energy.next_production - buildingsResources.energy.production).format('0,000,000,000,000').replaceAll(',', ' ')} énergie`}</Typography>
            <Typography>{`Métal : ${numeral(buildingsResources.energy.metal).format('0,000,000,000,000').replaceAll(',', ' ')} Cristal : ${numeral(buildingsResources.energy.crystal).format('0,000,000,000,000').replaceAll(',', ' ')}`}</Typography>
        </Card>
    </>
)}

export default Buildings;