import { Grid, Table, Dropdown } from '@nextui-org/react';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import React from 'react';

export default function SubmissionTable() {
    const [eventName, setEventName] = useState('Community Night 1');
    const [selected, setSelected] = React.useState('Community Night 1');
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const selectedValue = React.useMemo(
        () => Array.from(selected).join(', ').replaceAll('_', ' '),
        [selected]
    );

    useEffect(() => {
        const fetchEvents = async () => {
            let { data, error } = await supabase.from('Submissions').select('*');
            if (error) console.log('error', error);
            else {
                setEvents(data);
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        setFilteredEvents(
            events.filter((event) => (eventName ? event.eventName === eventName : true))
        );
    }, [events, eventName]);

    const columns = [
        {
            key: 'name',
            label: 'Name',
        },
        {
            key: 'link',
            label: 'Link',
        },
        {
            key: 'description',
            label: 'Description',
        },
        {
            key: 'category',
            label: 'Category',
        },
        {
            key: 'eventName',
            label: 'Event Name',
        },
    ];

    const handleSelectionChange = (value) => {
        setSelected(value);
        setEventName(value);
    };

    return (
        <><Grid.Container gap={1} justify='center'>
            <Grid xs={4}>
                <Dropdown>
                    <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
                        {selected}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="Single selection actions"
                        color="secondary"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selected}
                        onSelectionChange={setSelected}
                        onAction={handleSelectionChange}
                    >
                        <Dropdown.Item key="Community Night 1">
                            Community Night 1
                        </Dropdown.Item>
                        <Dropdown.Item key="Community Night 2">
                            Community Night 2
                        </Dropdown.Item>
                        <Dropdown.Item key="Community Night 3">
                            Community Night 3
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Grid>
            <Grid xs={9}>
                <Table
                    aria-label="Submission Form Table"
                    css={{
                        height: 'auto',
                        minWidth: '100%',
                    }}
                >
                    <Table.Header columns={columns}>
                        {(column) => <Table.Column key={column.key}>{column.label}</Table.Column>}
                    </Table.Header>
                    <Table.Body items={filteredEvents}>
                        {(item) => (
                            <Table.Row key={item.id}>
                                {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Grid>

        </Grid.Container>
        </>
    );
}
