import { useState, useEffect } from 'react';
import { RoutesType } from '@/types/routeTypes';
import { Roles } from '@/features/user/userType';
import { Pages } from '@/types/appTypes';

export interface MenuItemType {
    label: string;
    path: string;
}

export const menuPage = (isAuth: boolean, role: string) => {
    const [settingsMenuItems, setSettingsMenuItems] = useState<MenuItemType[]>([]);
    const [pagesMenuItems, setPagesMenuItems] = useState<MenuItemType[]>([{ label: Pages.Home, path: RoutesType.Home }]);
  
    useEffect(() => {
        if (isAuth) {
          setSettingsMenuItems([
            { label: Pages.Profile, path: RoutesType.ProfilUser },
            { label: Pages.Settings, path: RoutesType.ProfilSettings },
            { label: Pages.Logout, path: RoutesType.Logout }
          ]),
          setPagesMenuItems([
           // { label: Pages.Home, path: Routes.Login }, Kinda useless
          ]);
          setPagesMenuItems([
              ...(role === Roles.admin) ? [
                { label: Pages.DashboardHub, path: RoutesType.DashboardAdminHub }
              ] : [
                // empty...
              ]
            ]);
        } else {
          setPagesMenuItems([
            { label: Pages.Login, path: RoutesType.Login },
          ]);
          setSettingsMenuItems([
            { label: Pages.Login, path: RoutesType.Login }
          ]);
        }
      }, [isAuth]);
  
    return { settingsMenuItems, pagesMenuItems };
};

export const menuPageAdmin = (isAuth: boolean, role: string) => {
    const [settingsMenuItems, setSettingsMenuItems] = useState<MenuItemType[]>([]);
    const [pagesMenuItems, setPagesMenuItems] = useState<MenuItemType[]>([]);

  useEffect(() => {
    if (isAuth) {
      setSettingsMenuItems([
        { label: Pages.Logout, path: RoutesType.Logout }
      ]);

      setPagesMenuItems(
        role === Roles.admin
          ? [
              { label: Pages.DashboardHub, path: RoutesType.DashboardAdminHub },
              { label: Pages.DashboardSearchUser, path: RoutesType.DashboardAdminUser },
              { label: Pages.DashboardUserList, path: RoutesType.DashboardAdminUsers }
            ]
          : []
      );
    }
  }, [isAuth, role]);

  return { settingsMenuItems, pagesMenuItems };
};