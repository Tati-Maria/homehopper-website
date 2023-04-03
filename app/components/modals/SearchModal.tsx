'use client'

import { formatISO } from "date-fns";
import qs from "query-string";
import { Range } from "react-date-range";
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "../common/Modal"
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import ContentLayout from "../layouts/ContentLayout";
import Heading from "../common/Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });

    const Map = useMemo(() => dynamic(() => import('../Map'), {ssr: false}), [location]);

    const onBack = useCallback(() => {
        setStep((prev) => prev - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((prev) => prev + 1);
    }, []);

    //submit the form
    const onSubmitted = useCallback(async () => {
        if(step !== STEPS.INFO) return onNext();

        let currentQuery = {};
        //if there are params in the url, parse them
        if(params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
        };

        if(dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if(dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, { skipNull: true, skipEmptyString: true });

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
        
    }, [ location, guestCount, roomCount, bathroomCount, dateRange, step, onNext, params, searchModal, router ]);

    //change the action label based on the step
    const actionLabel = useMemo(() => {
        if(step === STEPS.INFO) return "Search";
        return "Next";
    }, [ step ]);

    //change the secondary action label based on the step
    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.LOCATION) return undefined;
        return "Back";
    }, [ step ]);

    let bodyContent = (
        <ContentLayout>
            <Heading
            title="Where are you going?"
            subText="Enter a location"
             />
             <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
              />
              <hr/>
              <Map
              center={location?.latlng} 
              />
        </ContentLayout>
    )

    if(step === STEPS.DATE) {
        bodyContent = (
            <ContentLayout>
                <Heading
                title="When are you going?"
                subText="Select a date range"
                />
                <Calendar
                onChange={(range) => setDateRange(range.selection)}
                value={dateRange} 
                />
            </ContentLayout>
        )
    }

    if(step === STEPS.INFO) {
        bodyContent = (
            <ContentLayout>
                <Heading
                title="Who's coming?"
                subText="Enter the number of guests"
                />
                <Counter
                title="Guess"
                subtitle="How many guests will be staying?"
                value={guestCount}
                onChange={(value) => setGuestCount(value)}
                />
                <Counter
                title="Rooms / Bedrooms"
                subtitle="How many rooms do you need?"
                value={roomCount}
                onChange={(value) => setRoomCount(value)} 
                />
                <Counter
                title="Bathrooms"
                subtitle="How many bathrooms do you need?"
                value={bathroomCount}
                onChange={(value) => setBathroomCount(value)} 
                />
            </ContentLayout>
        )
    }

  return (
    <Modal
    isOpen={searchModal.isOpen}
    onClose={searchModal.onClose}
    onSubmitted={onSubmitted}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step !== STEPS.LOCATION ? onBack : undefined}
    title="Filters"
    actionLabel={actionLabel} 
    body={bodyContent}
    />
  )
}

export default SearchModal;