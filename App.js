import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from './src/componentes/login/login';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { UsuarioVendedor } from './src/pages/vendedor/index';
import { UsuarioSupervisor } from './src/pages/supervisor/index';
import CustomDrawerContent from './src/componentes/drawer/drawertcustom.js'
import Icon from 'react-native-vector-icons/Ionicons';

// Paes from supervisor
import { PerfilSupervisor } from './src/pages/supervisor/perfil';
import { Persona } from './src/pages/supervisor/persona';
import { Operaciones } from './src/pages/supervisor/operaciones';
import { ReporteVentas } from './src/pages/supervisor/reporte';

// Paes from vendedor
import { PerfilVendedor } from './src/pages/vendedor/perfil';
import { CuotaDiaria } from './src/pages/vendedor/cuotaDiaria';
import { ReporteCuotaDiaria } from './src/pages/vendedor/reporteCuota';

//get data
import { getData } from './src/config/token'


export default function App() {
  const [isLogen, setIsLogen] = React.useState(false)
  const [type, setType] = React.useState()
  const Drawer = createDrawerNavigator();

  useEffect(() => {
    const asyncFunctionData = async () => {
      try {
        const userDATA = await getData();
        if(userDATA){
          setType(userDATA.us_tipo)
          setIsLogen(true)
          //console.log(userDATA)
        }else{
          setIsLogen(false)
        }
      } catch (e) {
        setIsLogen(false)
        //console.log(e)
      }
    }
    asyncFunctionData();
    return () => {
      console.log("This will be logged on unmount");
    }
  }, [setType, setIsLogen]);



  const pagesForUser = [
    {
      tipo: 2,
      componente: UsuarioVendedor,
      name: "Inicio",
      key: "inicio",
      icon: "home"
    },
    {
      tipo: 1,
      componente: PerfilSupervisor,
      name: "Perfil Supervisor",
      key: "perfilSupervisor",
      icon: "people"
    },
    {
      tipo: 1,
      componente: Persona,
      name: "Agregar persona",
      key: "persona",
      icon: "people"
    },
    {
      tipo: 1,
      componente: Operaciones,
      name: "Operaciones",
      key: "cuotas",
      icon: "people"
    },
    {
      tipo: 1,
      componente: ReporteVentas,
      name: "Reportes",
      key: "reporteventa",
      icon: "people"
    },
    {
      tipo: 1,
      componente: UsuarioSupervisor,
      name: "Superviosr",
      key: "supervisor",
      icon: "people"
    },
    {
      tipo: 2,
      componente: PerfilVendedor,
      name: "Perfil",
      key: "perfilVendedor",
      icon: "people"
    },
    {
      tipo: 2,
      componente: CuotaDiaria,
      name: "Cuota diaria",
      key: "cuetaDiaria",
      icon: "people"
    },
    {
      tipo: 2,
      componente: ReporteCuotaDiaria,
      name: "Reporte Cuota",
      key: "reporteCuota",
      icon: "people"
    }
  ]

  const allowPages = pagesForUser.filter(item => item.tipo !== parseInt(type));
  return (
    <NavigationContainer>
      {isLogen ?
        <Drawer.Navigator
          drawerContentOptions={{
            activeTintColor: '#535c68',
            itemStyle: {
              marginVertical: 5
            },
          }}
          drawerContent={
            (props) => <CustomDrawerContent props = {props} setIsLogen={setIsLogen}/>
          }
        >
          {
            allowPages.map((e) => (
              <Drawer.Screen key={e.key} name={e.name} component={e.componente}
                options={
                  {
                    drawerIcon: config =>
                      <Icon
                        size={23}
                        name={e.icon}
                        color={'#7ed6df'}
                      >
                      </Icon>
                  }
                }
              />
            ))
          }
        </Drawer.Navigator>
        :
        <Login setIsLogen={setIsLogen} setType={setType}></Login>
      }
    </NavigationContainer>
  );
}
