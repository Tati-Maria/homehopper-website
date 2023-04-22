'use client'
import { useRentModal } from "@/app/hooks/useRentModal"
import {
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import {toast} from "react-hot-toast";
//packages on top - local imports below
import Modal from "../common/Modal";
import Heading from "../common/Heading";
import { categories } from "../nav/Categories";
import CategoryInput from "../common/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import ContentLayout from "../layouts/ContentLayout";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";

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
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      if(step !== STEPS.PRICE) {
          return handleNext();
      }

      setIsLoading(true);

      axios.post('/api/listings', data).then(() => {
        toast.success('Listing created successfully');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.close();
      }).catch(() => {
        toast.error('Something went wrong');
      }).finally(() => {
        setIsLoading(false);
      })
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

    if(step === STEPS.IMAGES) {
      content = (
        <ContentLayout>
          <Heading
            title="Add a photo of your listing."
            subText="This will help guests get a better idea of what your listing is like."
          />
          <ImageUpload
          value={watch('image')}
          onUpload={(value) => setCustomValue('image', value)} 
          />
        </ContentLayout>
      )
    }

    if(step === STEPS.DESCRIPTION) {
      content = (
        <ContentLayout>
          <Heading
            title="Add a description of your listing."
            subText="This will help guests get a better idea of what your listing is like."
          />
          <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
           />
          <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          />
        </ContentLayout>
      )
    }

    if(step === STEPS.PRICE) {
      content = (
        <ContentLayout>
          <Heading
            title="Set a price for your listing."
            subText='How much do you want to charge per night?'
          />
          <Input
          id="price"
          label="Price"
          type="number"
          formatPrice
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          />
        </ContentLayout>
      )
    }

  return (
    <Modal
    disabled={isLoading}
    isOpen={rentModal.isOpen}
    onClose={rentModal.close}
    onSubmitted={handleSubmit(onSubmit)}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : handleBack}
    title="Rent your listing"
    body={content}
     />
  )
}

export default RentModal