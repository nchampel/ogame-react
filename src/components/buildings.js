import {
    Button,
    Card,
    Typography
  } from '@mui/material';
  import numeral from 'numeral';


const Buildings = (props) => {
    // const isMounted = useMounted();
    const { buildingsResources, buildings, addLevel } = props

    const buildingCardData = [{title: 'Mine de métal', type: 'metal'},
    {title: 'Mine de cristal', type: 'crystal'},
    {title: 'Synthétiseur de deutérium', type: 'deuterium'}]
    
    const BuildingCard = ({ title, type }) => {
        return (
          <Card sx={{ marginTop: '15px' }}>
            <Typography>{`${title} : ${buildings[type]}`}</Typography>
            <Typography>{`${numeral(buildingsResources[type]['production']).format('0,000,000,000,000').replaceAll(',', ' ')} /h`}</Typography>
            <Typography>{`Métal : ${numeral(buildingsResources[type]['metal']).format('0,000,000,000,000').replaceAll(',', ' ')} Cristal : ${numeral(buildingsResources[type]['crystal']).format('0,000,000,000,000').replaceAll(',', ' ')} Energie : ${numeral(buildingsResources[type]['next_energy'] - buildingsResources[type]['energy']).format('0,000,000,000,000').replaceAll(',', ' ')}`}</Typography>
            <Button onClick={() => addLevel(type, buildings[type])}>
              Construire
            </Button>
          </Card>
        );
      };
    
    return (
    <>
        {buildingCardData.map((building) => {
            return <BuildingCard key={building.type} title={building.title} type={building.type} />
        })}
    
        <Card sx={{
        marginTop: '15px',
        marginBottom: '15px'
        }}>
            <Typography>{`Centrale solaire : ${buildings.energy}`}</Typography>
            <Typography>{` + ${numeral(buildingsResources.energy.next_production - buildingsResources.energy.production).format('0,000,000,000,000').replaceAll(',', ' ')} énergie`}</Typography>
            <Typography>{`Métal : ${numeral(buildingsResources.energy.metal).format('0,000,000,000,000').replaceAll(',', ' ')} Cristal : ${numeral(buildingsResources.energy.crystal).format('0,000,000,000,000').replaceAll(',', ' ')}`}</Typography>
            <Button onClick={() => addLevel('energy', buildings.energy)}>
                Construire
            </Button>
        </Card>



    </>
)}

export default Buildings;