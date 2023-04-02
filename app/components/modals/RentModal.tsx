'use client'
import { useRentModal } from "@/app/hooks/useRentModal"
import {
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Modal from "../common/Modal";
import { useState, useMemo } from "react";
import Heading from "../common/Heading";
import { categories } from "../nav/Categories";
import CategoryInput from "../common/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import ContentLayout from "../layouts/ContentLayout";
import Counter from "../inputs/Counter";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);

    const {
      register,
      setValue,
      watch,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm<FieldValues>({
      defaultValues: {
        category: '',
        locationValue: null,
        numOfGuests: 1,
        roomCount: 1,
        bathroomCount: 1,
        image: '',
        price: 1,
        description: '',
        title: '',
      },
    });

    const category = watch('category');
    const locationValue = watch('locationValue');
    const guestCount = watch('numOfGuests');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');

    // this is a hack to prevent the map from rendering on the server
    const Map = useMemo(() => dynamic(() => import('../Map')), [location]);
    const setCustomValue = (id: string, value: any) => {
      setValue(id, value, { 
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
       })
    }


    const handleBack = () => {
      setStep((value) => value - 1);
    }

    const handleNext = () => {
      setStep((value) => value + 1);
    }

    const actionLabel = useMemo(() => {
      if(step === STEPS.PRICE) {
          return 'Create'
      }
      return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
      if(step === STEPS.CATEGORY) {
          return undefined
      }
      return 'Back';
    }, [step]);

    //body content
    let content = (
      <ContentLayout>
        <Heading
          title="What category is your listing?"
          subText="Choose the category that best describes your listing." 
        />
        <article
        className="
         grid
         grid-cols-1
          gap-3
         md:grid-cols-2
         max-h-[50vh]
         overflow-y-auto

        "
        >
          {categories.map((item) => (
            <CategoryInput 
            key={item.label} 
            label={item.label} 
            icon={item.icon} 
            selected={category === item.label} 
            onClick={(category) => setCustomValue('category', category)} 
            />
          ))}
        </article>
      </ContentLayout>
    );

    if(step === STEPS.LOCATION) {
      content = (
        <ContentLayout>
          <Heading
            title="Where is your listing located?"
            subText="Help guests find your listing by adding a location."
          />
          <CountrySelect
            value={locationValue}
            onChange={(value) => setCustomValue('locationValue', value)} 
          />
          <Map
          center={locationValue?.latlng}
          />
        </ContentLayout>
      )
    }

    if(step === STEPS.INFO) {
      content = (
        <ContentLayout>
          <Heading
            title="Share some information about your listing."
            subText="This information will help guests decide if your listing is right for them."
          />
          <Counter
          value={guestCount}
           onChange={(value) => setCustomValue('numOfGuests', value)}
            title="Guests"
            subtitle="How many guests?"
           />
           <br />
          <Counter
            value={roomCount}
           onChange={(value) => setCustomValue('roomCount', value)}
            title="Rooms"
            subtitle="How many rooms/bedrooms?"
           />
            <br />
          <Counter
          value={bathroomCount}
           onChange={(value) => setCustomValue('bathroomCount', value)}
            title="Bathrooms"
            subtitle="How many bathrooms?"
           />
          
        </ContentLayout>
      )
    }

  return (
    <Modal
    isOpen={rentModal.isOpen}
    onClose={rentModal.close}
    onSubmitted={handleNext}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : handleBack}
    title="Rent your listing"
    body={content}
     />
  )
}

export default RentModal