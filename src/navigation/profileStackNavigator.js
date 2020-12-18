import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/Ionicons';
// DRAWER CUSTOM
import CustomDrawerContent from './../componentes/drawer/drawertcustom'

// Paes from supervisor
import { UsuarioSupervisor } from './../pages/supervisor/index';
import { PerfilSupervisor } from './../pages/supervisor/perfil';
import { Persona } from './../pages/supervisor/persona';
import { Operaciones } from './../pages/supervisor/operaciones';
import { ReporteVentas } from './../pages/supervisor/reporte';

// Paes from vendedor
import { UsuarioVendedor } from './../pages/vendedor/index';
import { PerfilVendedor } from './../pages/vendedor/perfil';
import { CuotaDiaria } from './../pages/vendedor/cuotaDiaria';
import { ReporteCuotaDiaria } from './../pages/vendedor/reporteCuota';

//get data
import { getData } from './../config/token'
import { VersusPersona } from '../pages/supervisor/versusPersona';

const ProfileStack = createDrawerNavigator();
const ProfileStackScreen = (props) => {

  const [isLogen, setIsLogen] = React.useState(false)
  const [type, setType] = React.useState()

  useEffect(() => {
    const asyncFunctionData = async () => {
      try {
        const userDATA = await getData();
        if (userDATA) {
          setType(userDATA.us_tipo)
          setIsLogen(true)
          //console.log(userDATA)
        } else {
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
  }, []);

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
      componente: VersusPersona,
      name: "Comparar ventas",
      key: "ventascomp",
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
    <ProfileStack.Navigator
      drawerContentOptions={{
        activeTintColor: '#535c68',
        itemStyle: {
          marginVertical: 5
        },
      }}
      drawerContent={
        (props) => <CustomDrawerContent props={props} setIsLogen={1} />
      }
    >
      {
        allowPages.map((e) => (
          <ProfileStack.Screen key={e.key} name={e.name} component={e.componente}
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
    </ProfileStack.Navigator>
  )
};

export default ProfileStackScreen