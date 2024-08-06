import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { useEffect, useState } from 'react'
import SupportsService from '@/services/Supports'
import AuthService from '@/services/Auth';
import { Button } from '@/components/ui/button'

import { useMutation } from '@tanstack/react-query'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, Locale } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

  const locales = {
    'en-US': enUS,
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
    getDay,
    locales
  });

function Supports() {
    const [currentEvents, setCurrentEvents]:any = useState([]);
    const [openItem, setOpenItem]:any = useState({
        open: false,
        data: null
    });
    let setup = useMutation({
        mutationFn: SupportsService.getAll,
        onSuccess: async (data) => {
            if(data === null){
               const rest = await AuthService.refreshAccessToken();
               if(rest.accessToken){
                   setup.mutate();
               }else{
                AuthService.removeAuthToken();
               }
            }
            let newArra = data?.map((i:any) => {
             return {
                ...i,
                title: i.note,
                start: new Date(i.date),
                end: new Date(i.date),
              }   
            });
            setCurrentEvents(newArra);
           return data
        },
        onError: (error) => {
            console.log("error ", error)
        }
    }); 

  
    useEffect( () => {
        setup.mutate();
    }, [] )

    if(setup.isError) return <div>Error</div>
    if(setup.isPending) return <div className='flex h-[350px] w-full justify-center items-center'>Loading...</div>

    console.log(openItem)
    return (
        <div className='bg-[#fff] p-5 rounded-lg h-full overflow-auto'>
            <div>
                <div style={{ height: 500 }}>
                    <Calendar
                        localizer={localizer}
                        events={currentEvents}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        defaultView="month"
                        selectable
                        views={['month']}    
                        onSelectSlot={(slotInfo:any) => {
                        const title = window.prompt('New Event name');
                        if (title) {
                            setCurrentEvents([
                            ...currentEvents,
                            {
                                start: slotInfo.start,
                                end: slotInfo.end,
                                title,
                            },
                            ]);
                        }
                        }}
                        eventPropGetter={(event:any) => ({
                        style: {
                            backgroundColor: event.title === 'Meeting' ? 'lightblue' : 'lightgreen',
                        },
                        })}
                        onSelectEvent={(event) => setOpenItem({ open: true, data: event })}
                    />
                </div>
            </div>
            <Sheet open={openItem.open} onOpenChange={() => setOpenItem({ open: false, data: null }) }>
                
                <SheetContent>
                    <SheetHeader>
                    <SheetTitle> {openItem.data?.title} </SheetTitle>
                    <SheetDescription>
                           usuario: {openItem.data?.user?.name}
                    </SheetDescription>
                    </SheetHeader>
                </SheetContent>
                </Sheet>

        </div>
    )
}

export default Supports