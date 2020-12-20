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
import { VersusCiudad } from '../pages/supervisor/versusCiudad';

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
      componente: VersusCiudad,
      name: "Comparar ciudades",
      key: "ventasciud",
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

  const userSupervisor = () => (
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
      <ProfileStack.Screen key={"supervisor"} name={"Home"} component={UsuarioSupervisor} />
      <ProfileStack.Screen key={"perfilSupervisor"} name={"Perfil Supervisor"} component={PerfilSupervisor} />
      <ProfileStack.Screen key={"persona"} name={"Agregar persona"} component={Persona} />
      <ProfileStack.Screen key={"cuotas"} name={"Operaciones"} component={Operaciones} />
      <ProfileStack.Screen key={"reporteventa"} name={"Reportes"} component={ReporteVentas} />
      <ProfileStack.Screen key={"ventascomp"} name={"Comparar ventas"} component={VersusPersona} />
      <ProfileStack.Screen key={"ventasciud"} name={"Comparar ciudades"} component={VersusCiudad} />
    </ProfileStack.Navigator>
  )

  const userVendedor = () => (
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
      <ProfileStack.Screen key={"vendedor"} name={"Home"} component={UsuarioVendedor} />
      <ProfileStack.Screen key={"perfilVendedor"} name={"Perfil Vendedor"} component={PerfilVendedor} />
      <ProfileStack.Screen key={"cuetaDiaria"} name={"Cuota diaria"} component={CuotaDiaria} />
      <ProfileStack.Screen key={"reporteCuota"} name={"Reporte Cuota"} component={ReporteCuotaDiaria} />
    </ProfileStack.Navigator>
  )
  return (
    parseInt(type) === 1 ? userSupervisor() : userVendedor()
  )
};

export default ProfileStackScreen